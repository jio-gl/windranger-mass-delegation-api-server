import {expect} from 'chai'
import {handler} from '../src/handler'
import {APIGatewayProxyEvent} from 'aws-lambda/trigger/api-gateway-proxy'
import {Context} from 'aws-lambda'
import {mock, instance, when} from 'ts-mockito'


// Event example https://www.serverless.com/framework/docs/providers/aws/events/apigateway
describe('Lambda', () => {
    it('parses query parameters', async () => {
        const event = mock<APIGatewayProxyEvent>()
        when(event.queryStringParameters).thenReturn({
            ['first']: 'one',
            ['second']: 'two'
        })
        when(event.path).thenReturn('/')
        when(event.httpMethod).thenReturn('GET')

        const context = mock<Context>()
        when(context.awsRequestId).thenReturn('199')
        when(context.functionName).thenReturn('The best handler ever!')

        const result = await handler(instance(event), instance(context))

        expect(result).deep.equals({
            statusCode: 200,
            body: 'Method: "GET" Path: "/" Queries: {"first":"one","second":"two"}'
        })
    })
    it('voting power', async () => {
        const event = mock<APIGatewayProxyEvent>()
        when(event.queryStringParameters).thenReturn({})
        const exampleReq = `{
            "options":     {
                  "api": "https://test-url.for-snapshot.com:8000",
                  "symbol": "BIT",
                  "decimals": 0
                  },
            "network": "1",
            "addresses": [
              "0xEA2E9cEcDFF8bbfF107a349aDB9Ad0bd7b08a7B7",
              "0x3c4B8C52Ed4c29eE402D9c91FfAe1Db2BAdd228D",
              "0xd649bACfF66f1C85618c5376ee4F38e43eE53b63",
              "0x726022a9fe1322fA9590FB244b8164936bB00489",
              "0xc6665eb39d2106fb1DBE54bf19190F82FD535c19",
              "0x6ef2376fa6e12dabb3a3ed0fb44e4ff29847af68"
            ],
            "snapshot": 11437846
          }
          `
        when(event.body).thenReturn(exampleReq)
        when(event.path).thenReturn('/voting-power')
        when(event.httpMethod).thenReturn('POST')

        const context = mock<Context>()
        when(context.awsRequestId).thenReturn('199')
        when(context.functionName).thenReturn('The best handler ever!')

        const result = await handler(instance(event), instance(context))

        expect(result).deep.equals({
            statusCode: 200,
            body: 'Method: "POST" Path: "/voting-power" Queries: {}'
        })
    })
    it('mass delegate', async () => {
        const event = mock<APIGatewayProxyEvent>()
        when(event.queryStringParameters).thenReturn({})
        const exampleReq = `{
            "content": {
              "network": "1",
              "delegator": "0xdededededededededededededededededededede",
              "delegatees": [
                      {
                          "address" : "0xdededededededededededededededededededede",
                          "weight" : "95"
                      },
                      {
                          "address" : "0xd649bACfF66f1C85618c5376ee4F38e43eE53b63",
                          "weight" : "1"
                      },
                      {
                          "address" : "0xEA2E9cEcDFF8bbfF107a349aDB9Ad0bd7b08a7B7",
                          "weight" : "1"
                      },
                      {
                          "address" : "0x3c4B8C52Ed4c29eE402D9c91FfAe1Db2BAdd228D",
                          "weight" : "1"
                      },
                      {
                          "address" : "0x726022a9fe1322fA9590FB244b8164936bB00489",
                          "weight" : "1"
                      },
                      {
                          "address" : "0xc6665eb39d2106fb1DBE54bf19190F82FD535c19",
                          "weight" : "1"
                      }
              ],
              "total_weight" : "100",
              "snapshot": 11437846
            }, 
            "permit" : "SIGNATURE TO BE INCLUDED"
          }
          
          `
        when(event.body).thenReturn(exampleReq)
        when(event.path).thenReturn('/mass-delegate')
        when(event.httpMethod).thenReturn('POST')

        const context = mock<Context>()
        when(context.awsRequestId).thenReturn('199')
        when(context.functionName).thenReturn('The best handler ever!')

        const result = await handler(instance(event), instance(context))

        expect(result).deep.equals({
            statusCode: 200,
            body: 'Method: "POST" Path: "/mass-delegate" Queries: {}'
        })
    })
})
