"use client";

import React from "react";

const Analytics: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-900">
      <div className="text-center p-6 max-w-lg bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
          Analytics Page
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
          This page is currently in development. Please check back later for
          detailed analytics.
        </p>
        <div className="p-4">
          <div className="flex justify-center items-center">
            <div className="processing-icon-container">
              <svg
                className="rotate"
                width="100px"
                height="100px"
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>processing</title>
                <g id="Layer_2" data-name="Layer 2">
                  <g id="invisible_box" data-name="invisible box">
                    <rect width="48" height="48" fill="none" />
                    <rect width="48" height="48" fill="none" />
                    <rect width="48" height="48" fill="none" />
                  </g>
                  <g id="Q3_icons" data-name="Q3 icons">
                    <g>
                      <path d="M25.4,5.5a1.9,1.9,0,0,0-2.8.2,2,2,0,1,0,2.8-.2Z" />
                      <path d="M31.5,8.4a2.2,2.2,0,0,0,.2,3.1,2.3,2.3,0,1,0,3-3.4A2.2,2.2,0,0,0,31.5,8.4Z" />
                      <path d="M41.9,19.2a2.7,2.7,0,1,0-3.9.3A2.7,2.7,0,0,0,41.9,19.2Z" />
                      <path d="M42,27.6a3.5,3.5,0,1,0-4.5,5.3A3.5,3.5,0,0,0,42,27.6Z" />
                      <path d="M26.1,37.1a4.5,4.5,0,1,0,6.3-.5A4.4,4.4,0,0,0,26.1,37.1Z" />
                      <path d="M9.9,34.3a5.1,5.1,0,0,0,.5,7.1,5,5,0,1,0-.5-7.1Z" />
                      <circle
                        cx="7.2"
                        cy="22.1"
                        r="5.5"
                        transform="matrix(1, -0.08, 0.08, 1, -1.68, 0.62)"
                      />
                    </g>
                  </g>
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
