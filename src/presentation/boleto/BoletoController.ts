import { Request, Response } from "express";
import { BoletoUseCase } from "../../useCase/boletos/BoletoUseCase";

export class BoletoController {
  constructor(
    private boletoUseCase: BoletoUseCase,
  ) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const { barCode } = req.params;
    try {

      const result = await this.boletoUseCase.execute({
        barCode
      });

      return res.status(result.statusCode).json(result.result);
    } catch (err) {

      return res.status(400).json({
        message: err.message || 'Unexpected error.'
      });

    }
  }
}