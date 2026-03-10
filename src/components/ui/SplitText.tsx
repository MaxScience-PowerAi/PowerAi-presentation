import { motion } from 'framer-motion';

interface SplitTextProps {
    text: string;
    className?: string;
    delay?: number;
}

export const SplitText = ({ text, className = "", delay = 0 }: SplitTextProps) => {
    // If text is very short (like a name), we use character animation.
    // Otherwise, we use word animation for performance.
    const isShort = text.length < 20;
    const items = isShort ? text.split("") : text.split(" ");

    const itemVariants = {
        hidden: { opacity: 0, y: 10, rotateX: 45 },
        visible: {
            opacity: 1,
            y: 0,
            rotateX: 0,
            transition: {
                type: "spring" as const,
                damping: 20,
                stiffness: 150,
            },
        },
    };

    return (
        <motion.span
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
                visible: {
                    transition: {
                        staggerChildren: isShort ? 0.04 : 0.08,
                        delayChildren: delay,
                    },
                },
            }}
            key={text}
            className={`inline-block ${className}`}
            style={{ perspective: "1000px" }}
        >
            {items.map((item, index) => (
                <motion.span
                    key={index}
                    variants={itemVariants}
                    className="inline-block"
                    style={{ whiteSpace: item === " " ? "pre" : "normal" }}
                >
                    {item}{!isShort && index < items.length - 1 ? "\u00A0" : ""}
                </motion.span>
            ))}
        </motion.span>
    );
};
