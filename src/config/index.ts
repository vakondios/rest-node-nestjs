import app from '@app/config/applcation';
import db from '@app/config/database';
import jwt from '@app/config/jwt';
import server from '@app/config/server';
import services from '@app/config/services';
import settings from '@app/config/settings';
import logger from '@app/config//logger';

export default [app, db, settings, services, jwt, server, logger];
