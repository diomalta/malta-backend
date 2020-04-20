import { Service, Inject } from 'typedi';
import * as jwt from 'jsonwebtoken';
import MailerService from './mailer';
import config from '../config';
import * as argon2 from 'argon2';
import { randomBytes } from 'crypto';
import { IUser, IUserInputDTO } from '../interfaces/IUser';
import throwError from '../utils/thowError';

@Service()
export default class AuthService {
  constructor(
    @Inject('userModel') private userModel,
    private mailer: MailerService,
    @Inject('logger') private logger,
  ) {}

  public async SignUp(userInputDTO: IUserInputDTO): Promise<{ user: IUser; token: string }> {
    try {
      const salt = randomBytes(32);

      this.logger.silly('Check already exist email');
      if (await this.userModel.findOne({ email: userInputDTO.email })) {
        throwError('Email already exists');
      }

      this.logger.silly('Check already exist username');
      if (await this.userModel.findOne({ username: userInputDTO.username })) {
        throwError('Username already exists');
      }

      this.logger.silly('Hashing password');
      const hashedPassword = await argon2.hash(userInputDTO.password, { salt });

      this.logger.silly('Creating user db record');
      const userRecord = await this.userModel.create({
        ...userInputDTO,
        salt: salt.toString('hex'),
        password: hashedPassword,
      });

      this.logger.silly('Generating JWT');
      const token = this.generateToken(userRecord);

      if (!userRecord) {
        throwError('User cannot be created');
      }

      this.logger.silly('Sending welcome email');
      await this.mailer.SendWelcomeEmail(userRecord);

      /**
       * @TODO This is not the best way to deal with this
       * There should exist a 'Mapper' layer
       * that transforms data from layer to layer
       * but that's too over-engineering for now
       */
      const user = userRecord.toObject();
      Reflect.deleteProperty(user, 'password');
      Reflect.deleteProperty(user, 'salt');

      return { user, token };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async SignIn(emailOrUsername: string, password: string): Promise<{ user: IUser; token: string }> {
    this.logger.silly('Checking email or username');
    const userRecord = await this.userModel.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
    });

    if (!userRecord) {
      throwError('User not registered');
    }
    /**
     * We use verify from argon2 to prevent 'timing based' attacks
     */
    this.logger.silly('Checking password');
    const validPassword = await argon2.verify(userRecord.password, password);
    if (validPassword) {
      this.logger.silly('Password is valid!');
      this.logger.silly('Generating JWT');
      const token = this.generateToken(userRecord);

      const user = userRecord.toObject();
      Reflect.deleteProperty(user, 'password');
      Reflect.deleteProperty(user, 'salt');
      /**
       * Easy as pie, you don't need passport.js anymore :)
       */
      return { user, token };
    } else {
      throwError('Invalid Password');
    }
  }

  private generateToken(user) {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    /**
     * A JWT means JSON Web Token, so basically it's a json that is _hashed_ into a string
     * The cool thing is that you can add custom properties a.k.a metadata
     * Here we are adding the userId, role and name
     * Beware that the metadata is public and can be decoded without _the secret_
     * but the client cannot craft a JWT to fake a userId
     * because it doesn't have _the secret_ to sign it
     * more information here: https://softwareontheroad.com/you-dont-need-passport
     */
    this.logger.silly(`Sign JWT for userId: ${user._id}`);
    return jwt.sign(
      {
        _id: user._id, // We are gonna use this in the middleware 'isAuth'
        role: user.role,
        name: user.name,
        exp: exp.getTime() / 1000,
      },
      config.jwtSecret,
    );
  }
}
