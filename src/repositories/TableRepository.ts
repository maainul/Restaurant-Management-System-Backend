import ITable from "../interfaces/table/ITable";
import ITableRepository from "../interfaces/table/ITableRepository";

import Table from './../models/table/Table.model';

class TableRepository implements ITableRepository {
    
    async create(table: ITable): Promise<ITable> {
        console.log("TableRepository:create called")
        return await Table.create(table)
    }
    
    async findById(id: string): Promise<ITable | null> {
        console.log("TableRepository:create called")
        const result = await Table.findById({ id: id })
        return result
    }
    
    async findByTableNumber(tableNumber: string): Promise<ITable | null> {
        console.log("TableRepository:create called")
        const result = await Table.findOne({ table: tableNumber })
        return result
    }
    
    async findAll(filter: any = {}, options: { sort?: any, skip: number, limit?: number }): Promise<ITable[]> {
        console.log("TableRepository:create called")
        return await Table.find()
    }
    
    async update(id: string, table: Partial<ITable>): Promise<ITable | null> {
        console.log("TableRepository:create called")
        return await Table.findByIdAndUpdate(id, table, { new: true })
    }

    async delete(id: string): Promise<boolean> {
        console.log("TableRepository:create called")
        const result = await Table.findByIdAndDelete(id)
        return !!result
    }
    async countDocuments(filter: any = {}): Promise<number> {
        return await Table.countDocuments(filter);
      }

}
export default TableRepository