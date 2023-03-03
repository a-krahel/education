import { DataTypes } from 'sequelize';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

enum UserRole {
  admin = 'admin',
  user = 'user',
}

@Table
export class Users extends Model {
  @Column({ autoIncrement: true, primaryKey: true })
  id: DataTypes.IntegerDataType;

  @Column({ allowNull: false, unique: true })
  email: DataTypes.StringDataType;

  @Column({ allowNull: false })
  password: string;

  @Column({
    allowNull: false,
    defaultValue: UserRole.user,
    type: DataType.ENUM(...Object.values(UserRole)),
  })
  role: UserRole;

  @Column({ allowNull: false, defaultValue: Date.now() })
  lastLogin: DataTypes.DateDataType;

  @Column({ allowNull: false, defaultValue: Date.now() })
  created: DataTypes.DateDataType;

  @Column({ allowNull: false, defaultValue: false })
  isActive: DataTypes.BlobDataType;

  @Column
  confirmationCode: DataTypes.StringDataType;

  @Column
  expirationDate: DataTypes.StringDataType;
}
