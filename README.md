# Tables4U - Ishizu Ishtar
There should be no major issues with our application. If data does not render, it is due to a failed API call. Reloading the page is well defined behavior and should populate the page. If a broken state is reached the following entry points can be used depending on login status:
- Consumer: `/`
- Manager: `/manage`
- Admin: `/admin`