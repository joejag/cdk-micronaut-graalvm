import * as cdk from "@aws-cdk/core"
import * as apigateway from "@aws-cdk/aws-apigateway"
import * as lambda from "@aws-cdk/aws-lambda"

export class BStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    const handler = new lambda.Function(this, "WidgetHandler", {
      runtime: lambda.Runtime.PROVIDED,
      code: lambda.Code.fromAsset("../build/function.zip"),
      memorySize: 1024,
      handler: "example.micronaut.BookRequestHandler",
    })

    const api = new apigateway.RestApi(this, "widgets-api", {
      restApiName: "Widget Service",
      description: "This service serves widgets.",
    })

    const getWidgetsIntegration = new apigateway.LambdaIntegration(handler, {
      requestTemplates: { "application/json": '{ "statusCode": "200" }' },
    })

    api.root.addMethod("POST", getWidgetsIntegration)
  }
}
