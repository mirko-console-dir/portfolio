## MY 3D PORTFOLIO

    3D models downloded from Sketchfab website

## Technologies

    - Rect 
        - React fiber library to create a 3D graphic in Threejs
        - React's component as VerticalTimelineElement

    - Three JS
        - load, create and customize threejs 3D models
        - camera
        - lighting
        - geometry
    
    - Tailwind
    - Framer motion
    - Email js
    - Suspense => from react for the performance to have a loader when the canvas is loading
    - Preload => from drei for the performance to create a preloader
    - Tilt for the tilt of the cards about section

    -Higher Order Component with staggerContainer and SectionWrapper to wrap all the section to make the same spaces and looking good, folter hoc. pass the compoent and the id
    In case of the About compoenent
    export default SectionWrapper(About, "about");


# Additional dependencies

    --legacy-peer-deps => to install old packages as react-tilt
    @react-three/fiber => react base threejs library
    react-tilt, react-vertical-time-line-component => for the user experience

    npm install --legacy-peer-deps @react-three/fiber @react-three/drei maath react-tilt react-vertical-time-line-component @emailjs/browser framer-motion react-router-dom     

    npm install --legacy-peer-deps three 

  # Important Comments

    There is a limit on the number of Canvas elements that can be used in a browser, which can vary depending on the device.

    To avoid exceeding this limit and maintain compatibility with Android or mobile devices, it is recommended to limit the number of Canvas elements.

    The maximum number of Canvas elements that could be used without causing any issues with 3D models on Android devices was determined to be 8.
    The specific elements used in the example scenario were: 1 Computer, 5 balls, 1 earth, and 1 stars -> limit

