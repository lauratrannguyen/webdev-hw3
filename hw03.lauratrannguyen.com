server {
        listen 80;
        listen [::]:80;

        root /home/lauranguyen/www/hw03.lauratrannguyen.com/build;

        index index.html;

        server_name hw03.lauratrannguyen.com;

        location / {
                # First attempt to serve request as file, then
                # as directory, then fall back to displaying a 404.
                try_files $uri $uri/ =404;
        }
}
