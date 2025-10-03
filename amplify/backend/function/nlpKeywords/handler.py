
def handler(event, context):
    print("event:", event)

    return {
        "statusCode": 200,
        "headers": {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
        },
        "body": '"Hello from myFunction!"'
    }
