import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { LambdaRestApi } from 'aws-cdk-lib/aws-apigateway';
import {  Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction, NodejsFunctionProps } from 'aws-cdk-lib/aws-lambda-nodejs';
import { join } from 'path';


export class CarProjectStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    
    const nodeJsFunctionProps: NodejsFunctionProps = {
      bundling: {
        externalModules: [
          'aws-sdk'
        ]
      },
      runtime: Runtime.NODEJS_14_X
    }

    // Product microservices lambda function
    const carLambda = new NodejsFunction(this, 'carLambdaFunction', {
      entry: join(__dirname, `/../handler/getCarDetails.ts`),
      ...nodeJsFunctionProps,
    })

    const apigw = new LambdaRestApi(this, 'CarAPI', {
      restApiName: 'carAPIGateway',
      handler: carLambda,
      proxy: false
    });

    const car = apigw.root.addResource('car');
    car.addMethod('GET'); // GET /product
  
  }
}
