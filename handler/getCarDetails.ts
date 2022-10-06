export async function handler(event: any, context: any) {
    console.log('Got an event:');
    console.log(event);
    return {
        statusCode: 200,
        body: 'Here are your buckets:'
    }
}

