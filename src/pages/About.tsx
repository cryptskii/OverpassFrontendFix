import React from 'react'

const About: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">About Overpass</h1>
      <p className="mb-4">
        Overpass is a cutting-edge platform built on the TON blockchain, designed to provide users with a seamless and
        efficient way to manage their TON transactions.
      </p>
      <p className="mb-4">
        Our mission is to simplify the process of sending and receiving TON, while ensuring the highest levels of
        security and transparency.
      </p>
      <h2 className="text-2xl font-semibold mb-2">Key Features:</h2>
      <ul className="list-disc list-inside mb-4">
        <li>Easy wallet connection using TonConnect</li>
        <li>Real-time balance updates</li>
        <li>Simplified transaction history</li>
        <li>Secure and fast TON transfers</li>
      </ul>
      <p>
        Join us in revolutionizing the way you interact with the TON blockchain!
      </p>
    </div>
  )
}

export default About
