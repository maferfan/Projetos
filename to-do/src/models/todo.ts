import { Model, DataTypes } from "sequelize";
import { sequelize } from '../database/todo'

export interface TodoTypes extends Model {
    id: number,
    title: string,
    done: boolean
}

export const Todo = sequelize.define<TodoTypes>('Todo', {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING
    },
    done: {
        type: DataTypes.BOOLEAN
    }
},
    {
        tableName: 'todos',
        timestamps: false
    }
)