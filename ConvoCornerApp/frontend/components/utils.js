
export function emailSend(receiver_email, name, message, templateId) {
    let data = {
        service_id: process.env.NEXT_PUBLIC_SERVICE_ID,
        template_id: templateId,
        user_id: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
        template_params: {
            'receiver_email': receiver_email,
            'to_name': name,
            'message' : message
        }
    };

    fetch(`https://api.emailjs.com/api/v1.0/email/send`, {
        method: 'POST',
        headers : { 'Content-Type': 'application/json' },
        body : JSON.stringify(data)
      }).then(res => console.log(res))
  }


export async function calculateDirections(userLocation, center) {
    let distance = 6550
    const directionsService = new google.maps.DirectionsService()
    await directionsService.route(
        {
            origin: new google.maps.LatLng(center.lat, center.lng),
            destination: new google.maps.LatLng(userLocation.lat, userLocation.lng),
            travelMode: 'DRIVING',
            },
            (result, status) => {
            if (status === 'OK') {
                console.log(result)
                distance = result.routes[0].legs[0].distance.value
            } else {
                console.log('Directions request failed:', status);
                console.log(userLocation, center)   
                }
            }
        );
        return distance
    };

export async function convertImageToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}