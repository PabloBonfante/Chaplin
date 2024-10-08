import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface UsuarioAttributes {
    Id?: number,
    Nombre: string,
    Apellido: string,
    Alias: string,
    DNI: number,
    Email: string,
    Password: string,
    FechaCreacion: Date,
    IdRol: number
}

interface UsuarioCreationAttributes extends Optional<UsuarioAttributes, 'Id'> { }

class Usuario extends Model<UsuarioAttributes, UsuarioCreationAttributes> implements UsuarioAttributes {
    public Id!: number;
    public Nombre!: string;
    public Apellido!: string;
    public Alias!: string;
    public DNI!: number;
    public Email!: string;
    public Password!: string;
    public FechaCreacion!: Date;
    public IdRol!: number;
}

Usuario.init({
    Id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    Nombre: {
        type: new DataTypes.TEXT,
        allowNull: false,
    },
    Apellido: {
        type: new DataTypes.TEXT,
        allowNull: false,
    },
    Alias: {
        type: new DataTypes.TEXT,
        allowNull: false,
    },
    DNI: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    Email: {
        type: new DataTypes.TEXT,
        allowNull: false,
    },
    Password: {
        type: new DataTypes.TEXT,
        allowNull: false,
    },
    FechaCreacion: {
        type: new DataTypes.DATE,
        allowNull: false,
    },
    IdRol: {
        type: new DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'usuario',
    sequelize,
    timestamps: false,
});

export default Usuario;

