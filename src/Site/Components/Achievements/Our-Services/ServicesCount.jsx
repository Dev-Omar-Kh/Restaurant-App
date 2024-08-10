import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function AnimatedNumber ({ targetNumber, increment, duration, label }) {

    const [number, setNumber] = useState(0);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {

        let interval;

        if (isInView && number < targetNumber) {

            interval = setInterval(() => {
                setNumber((prev) => {
                if (prev + increment >= targetNumber) {
                    clearInterval(interval);
                    return targetNumber;
                }
                return prev + increment;
                });
            }, duration);

        }

        return () => clearInterval(interval);

    }, [isInView, number, targetNumber, increment, duration]);

    const formatNumber = (num) => {

        if (num >= 1000) {
            return (num / 1000).toFixed(0) + 'K';
        }

        return num.toLocaleString();

    };

    return <React.Fragment>

        <div>

            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                onViewportEnter={() => setIsInView(true)}
                viewport={{ once: true, amount: 0.8 }}
            >

                {targetNumber <= 200 ? '+' : ''} {formatNumber(number)}

            </motion.p>

            <span>{label}</span>

        </div>

    </React.Fragment>
};