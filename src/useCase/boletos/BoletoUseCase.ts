import { CreateBoeltoDTO } from "../../presentation/boleto/dto/BoletoDTO"
import { Boletos } from "../../mock/boletos"

export class BoletoUseCase {
  constructor() { }

  async execute(data: CreateBoeltoDTO) {
    try {
      const params = data.barCode

      const validSize = await this.validSizeData(params)
      const validValue = await this.validValueData(params)

      if (validValue) throw new Error('Codigo de barras invalido! Favor digitar apenas números!')

      if (!validSize) throw new Error('Tamanho do codigo de barras diferente que 44 digitos!')


      const find = Boletos.find(value => {
        if (value.codigo == params) return value
      });

      if (!find) throw new Error('Codigo de barras não encontrado!')

      const result = {
        barCode: params,
        amount: find.valor,
        expirationDate: find.dataVencimento
      }

      return {
        statusCode: 200,
        result
      }
    } catch (error) {
      throw new Error(error)
    }
  }

  private async validSizeData(data: any) {
    console.log(JSON.stringify(data).length)
    if (JSON.stringify(data).length > 44 || (JSON.stringify(data).length < 44)) return false
    else {
      return true
    }
  }

  private async validValueData(data: string) {
    if (data) {
      if (data.includes('.')) return true
      const regex = /[$&+,:=?@#|'<>^*()%!-]/gm;
      const valid = regex.test(data)
      if (valid) return true
    }
    else {
      return false
    }
  }
}




