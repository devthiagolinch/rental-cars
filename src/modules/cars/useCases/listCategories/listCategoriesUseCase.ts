import { inject, injectable } from "tsyringe";
import { Category } from "../../entities/Category";
import { ICategoriesRepository } from "../../repositories/ICategoryRepository";

@injectable()
class ListCategoriesUseCase {
    constructor(
        @inject("CategoriesRepository")
        private categoriesRepository: ICategoriesRepository){}

    async execute(): Promise<Category[]> {
        const all = await this.categoriesRepository.list();

        return all;
    }
}

export { ListCategoriesUseCase }