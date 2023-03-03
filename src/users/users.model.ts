import { Column, DataType, Model, Table } from 'sequelize-typescript';

enum UserRole {
  admin = 'admin',
  user = 'user',
}

@Table
export class Users extends Model {
  @Column({ autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ allowNull: false, unique: true })
  email: string;

  @Column({ allowNull: false })
  password: string;

  @Column({
    allowNull: false,
    defaultValue: UserRole.user,
    type: DataType.ENUM(...Object.values(UserRole)),
  })
  role: UserRole;

  @Column({ allowNull: false, defaultValue: Date.now() })
  lastLogin: Date;

  @Column({ allowNull: false, defaultValue: Date.now() })
  created: Date;

  @Column({ allowNull: false, defaultValue: false })
  isActive: boolean;

  @Column
  confirmationCode: string;

  @Column
  expirationDate: string;
}
