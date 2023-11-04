
import { PageOptionsDto } from "../_dto/page.options.dto";
import { FindManyOptions } from "typeorm";

export interface IBaseReadService<T> {

    searchEqual(searchFields: Extract<keyof T, string>[], search: string): Promise<{data:T[], totalRecords: number}>
    searchLike(searchFields: Extract<keyof T, string>[], search: string): Promise<{data:T[], totalRecords: number}>
    findByManyOptions(fieldObject: FindManyOptions<T>): Promise<T[]>
    findAll(): Promise<T[]>;
    findOneById(id: number): Promise<T>;
    findBySql(query: string, parameters?: any[]): Promise<any>;
    findAllPaginated(pageOptionsDto: PageOptionsDto, table:string): Promise<any>;
    update(id:any,requestDto: any, entityDto:any): Promise<T>;
    create(requestDto: any, entityDto: any): Promise<T>;
    createMany(requestDto: any[], entityDto: any): Promise<T[]>;
    remove(id:any): Promise<T>;
  }