//variable to check if the web app is being run from a localhost server
// or local development environment

const islocalHost = Boolean(
    window.location.hostname === 'localhost' || window.location.hostname === '[::1]' || window.location.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
    //localhost or ipv6 or ipv4
);


export async function register(config) {
    if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
        const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);

        if (publicUrl.origin !== window.location.origin) {
            return;
        }


        const loadEventListener = () => {
            return new Promise((resolve) => {
                window.addEventListener('load', resolve);
            });
        };

        await loadEventListener();


        const swUrl = `${process.env.PUBLIC_URL}/serviceWorker.js`;

        if (islocalHost) {
            checkValidServiceWorker(swUrl, config);

            await navigator.serviceWorker.ready;
                  console.log(
                    'This web app is being served cache-first by a service ' +
                    'worker. To learn more, visit http://bit.ly/CRA-PWA'
                );

        } else {
            registerValidSW(swUrl, config);
        }
    }   
}







registerValidSW(){

}

async function checkValidServiceWorker(swUrl, config) {
    try {
        const response = await fetch(swUrl);
        const contentType = response.headers.get('content-type');

        if (response.status === 404 || (contentType != null && contentType.indexOf('javascript') === -1)) {
            //service worker not found so unregister the existing worker and reload page
            const registration = await navigator.serviceWorker.ready;
            await registration.unregister();
            window.location.reload();
        } else {
            //service worker found
            registerValidSW(swUrl, config);
        }
    }catch(error){
        console.log('No internet connection found. App is running in offline mode.');
    }   
}

export async function unregister() { 
    if ('serviceWorker' in navigator) {
        const registration = await navigator.serviceWorker.ready;
        await registration.unregister();
    }
}