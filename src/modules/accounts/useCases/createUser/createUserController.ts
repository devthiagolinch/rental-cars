import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateUserUseCase } from "./createUserUseCase";

class CreateUserController {
    
    async handle(request: Request, response: Response): Promise<Response> {
        const { name, email, password, driver_license, isAdmin } = request.body;

        const createUserUseCase = container.resolve(CreateUserUseCase)

        try {
            await createUserUseCase.execute({name, email, password, driver_license, isAdmin})
            return response.status(200).send()
        } catch (error) {
            return response.status(404).json(error)
        }
    }
}

export { CreateUserController }