import requests

def lambda_handler(event, context):
    url = "http://52.200.157.65:8080/webshop/task"
    
    try:
        response = requests.get(url)
        response.raise_for_status()  # Ensure we handle HTTP errors
        
        print("Response Text:", response.text)  # Debugging

        # Check if the response body is empty
        if not response.text.strip():  
            return {
                "statusCode": 204,
                "body": "No content received from the server."
            }
        
        return {
            "statusCode": response.status_code,
            "body": response.json()  # Ensure JSON format
        }
    except requests.RequestException as e:
        return {
            "statusCode": 500,
            "body": str(e)
        }
