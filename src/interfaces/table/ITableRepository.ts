import ITable from "./ITable";

interface ITableRepository {
    create(table: Partial<ITable>): Promise<ITable>;
    findById(id: string): Promise<ITable | null>;
    findByTableNumber(tableNumber: string): Promise<ITable | null>;
    findAll(filter: any, options: { sort?: any, skip: number, limit?: number }): Promise<ITable[]>;
    update(id: string, table: Partial<ITable>): Promise<ITable | null>;
    delete(id: string): Promise<boolean>;
    countDocuments(filter: any): Promise<number>;
}

export default ITableRepository