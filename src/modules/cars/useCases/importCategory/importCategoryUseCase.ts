import fs from "fs";
import {parse as csvParse} from "csv-parse"

import { ICategoriesRepository } from "../../repositories/ICategoryRepository";
import { inject, injectable } from "tsyringe";

interface IImportCategory {
    name: string;
    description: string;
}

@injectable()
class ImportCategoryUseCase {
    constructor(
        @inject("CategoriesRepository")
        private categoriesRepository: ICategoriesRepository) {}

    loadImportCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
        return new Promise((resolve, reject) => {
            const stream = fs.createReadStream(file.path);
            const categories: IImportCategory[] = [];

            const parseFile = csvParse();
    
            stream.pipe(parseFile)
    
            parseFile.on("data", async (line) => {
                const [name, description] = line;

                categories.push({
                    name,
                    description
                })
            }).on("end", () => {
                resolve(categories)
            }).on("end", () => {
                fs.promises.unlink(file.path)
            }).on("error", (err) => {
                reject(err)
            })
        })
    }

    async execute(file: Express.Multer.File): Promise<void> {
        const categories = await this.loadImportCategories(file);
        
        categories.map(
            async (category) => {
                const {name, description} = category;

                const existsCategory = await this.categoriesRepository.findByName(name);

                if(!existsCategory) {
                    await this.categoriesRepository.create({name, description});
                }
            
        })
    }
}

export { ImportCategoryUseCase }