import React from "react";
import "./styles.css"

const Shimmer = () => {
  return (
    <div>
      <div class="bg-gray-100">
        <div class="container mx-auto p-4 ">
          <div class="mb-6">
            <div class="h-10 bg-gray-100 rounded w-1/3  "></div>
          </div>

          <div class="space-y-4">
            <div class="h-4 bg-gray-300 rounded w-full"></div>
            <div class="h-4 bg-gray-300 rounded w-3/4 "></div>
            <div class="h-4 bg-gray-300 rounded w-1/2 "></div>
            
          </div>

          <div class="mt-8">
            <div class="h-48 bg-gray-300 rounded-lg "> <div className="shimmer   w-20 h-full"></div></div>
            <div class="mt-4">
              <div class="h-4 bg-gray-300 rounded w-1/2 "></div>
              <div class="h-4 bg-gray-300 rounded w-1/3 mt-2 "></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
// {/*
// /* Create the animated shimmer overlay */
// .shimmer::before {
//   content: "";
//   position: absolute;
//   top: 0;
//   left: 0%;
//   width:10%;
//   height: 105%; /* Slightly larger than the parent to cover edges */
  
//   /* Define the gradient background */
//   background: linear-gradient(
//     90deg,
//     var(--shimmer-color-start) 0%,
//     var(--shimmer-color-middle) 50%,
//     var(--shimmer-color-end) 100%
//   );

//   /* Skew the element for a dynamic effect */
//   transform: skewX(20deg);
  
//   /* Animate the transform property */
//   animation: shimmer 1s infinite linear;
// }

// /* Animate the shimmer by moving it across the element */
// @keyframes shimmer {
//   0% {
//     transform: translateX(-100%) skewX(-20deg);
//   }
//   100% {
//     transform: translateX(1000%)  skewX(-20deg);
//   }
// }

export default Shimmer;
