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

