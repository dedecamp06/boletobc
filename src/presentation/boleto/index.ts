
import { BoletoUseCase } from "../../useCase/boletos/BoletoUseCase";
import { BoletoController } from "./BoletoController";

const boletoUsecase = new BoletoUseCase()
const boletoController = new BoletoController(
  boletoUsecase
)

export { boletoUsecase, boletoController }