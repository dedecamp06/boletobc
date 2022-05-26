import { Router } from "express";
import { boletoController } from "../presentation/boleto"

const router = Router()

router.get('/boleto/:barCode', (request, response) => {
  return boletoController.handle(request, response);
});

export { router }