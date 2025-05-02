import { Fragment, JSX, useEffect, useState } from "react";
import { motion } from 'framer-motion';
import { marked } from "marked";
import Loading from "../loading/Loading";

interface ChatBubbleProps {
    text: string;
    delay?: number;
    isUser: boolean;
    isLoading?: boolean;
    image?: File | null;
}

type Word = { word: string; className: string }
type Block = { tag: string; words: Word[] }

const ChatBubble: React.FC<ChatBubbleProps> = ({ text, delay = 150, isUser, isLoading, image }) => {
    // const [blocks, setBlocks] = useState<Block[]>([])

    // const [isAnimatingDone, setIsAnimatingDone] = useState(false);

    // useEffect(() => {
    //     if (blocks.length === 0) return; // don't do anything if blocks not ready

    //     const totalWords = blocks.reduce((acc, block) => acc + block.words.length, 0);
    //     const totalDuration = totalWords * (delay / 1000) + 0.5; // add small buffer

    //     const timeout = setTimeout(() => {
    //         setIsAnimatingDone(true);
    //     }, totalDuration * 1000);

    //     return () => clearTimeout(timeout);
    // }, [blocks, delay]);

    // useEffect(() => {
    //     setIsAnimatingDone(false)
    //     const parseMarkdownToBlocks = async () => {
    //         const rawHtml = await marked.parse(text)
    //         const tempDiv = document.createElement('div')
    //         tempDiv.innerHTML = rawHtml

    //         const parsedBlocks: Block[] = []

    //         const walk = (node: Node, tag = 'p', style = '', indexInList?: number) => {
    //             if (node.nodeType === Node.ELEMENT_NODE) {
    //                 const el = node as HTMLElement
    //                 const tagName = el.tagName.toLowerCase()

    //                 if (['p', 'li', 'h1', 'h2', 'h3'].includes(tagName)) {
    //                     const words: Word[] = []

    //                     // If it's a numbered list, add "1.", "2." etc as a word
    //                     if (tagName === 'li' && typeof indexInList === 'number') {
    //                         words.push({ word: `${indexInList}.`, className: 'mr-1' })
    //                     }

    //                     for (const child of Array.from(el.childNodes)) {
    //                         collectWords(child, '', words)
    //                     }

    //                     parsedBlocks.push({ tag: tagName, words })
    //                 } else if (tagName === 'ul' || tagName === 'ol') {
    //                     const isOrdered = tagName === 'ol'
    //                     const listItems = Array.from(el.children).filter(child => child.tagName.toLowerCase() === 'li')
    //                     listItems.forEach((li, idx) => walk(li, 'li', '', isOrdered ? idx + 1 : undefined))
    //                 } else {
    //                     for (const child of Array.from(el.childNodes)) {
    //                         walk(child, tag, style)
    //                     }
    //                 }
    //             }
    //         }

    //         const collectWords = (node: Node, style = '', acc: Word[]) => {
    //             if (node.nodeType === Node.TEXT_NODE) {
    //                 const split = (node.textContent || '').split(/(\s+)/)
    //                 split.forEach(word => {
    //                     if (word) acc.push({ word, className: style })
    //                 })
    //             } else if (node.nodeType === Node.ELEMENT_NODE) {
    //                 const el = node as HTMLElement
    //                 const tag = el.tagName.toLowerCase()
    //                 let nextStyle = style

    //                 if (tag === 'strong' || tag === 'b') nextStyle += ' font-bold'
    //                 if (tag === 'em' || tag === 'i') nextStyle += ' italic'
    //                 if (tag === 'code') nextStyle += ' font-mono bg-gray-200 px-1 rounded'

    //                 for (const child of Array.from(el.childNodes)) {
    //                     collectWords(child, nextStyle, acc)
    //                 }
    //             }
    //         }

    //         for (const child of Array.from(tempDiv.childNodes)) {
    //             walk(child)
    //         }

    //         setBlocks(parsedBlocks)
    //     }

    //     parseMarkdownToBlocks()
    // }, [text])

    // let globalIndex = 0


    const [htmlContent, setHtmlContent] = useState<any>('');
    const [loading, setLoading] = useState<boolean>(false);



    useEffect(() => {
        setLoading(true);
        setHtmlContent('')

        const html = text;
        const tokens = html.split(/(\s+|<[^>]+>)/).filter(Boolean);
        let index = 0;
        let accumulated = '';

        const interval = setInterval(() => {
            accumulated += tokens[index];
            setHtmlContent(accumulated);
            index++;
            if (index >= tokens.length) {
                clearInterval(interval);
                setLoading(false);
            }
        }, 5)
    }, [text])

    return (
        <Fragment>
            {!isUser && !isLoading && (
                <div
                    className={`rounded-2xl whitespace-pre-wrap text-sm leading-relaxed h-fit text-black`}>
                    <div className='text-base text-[14px] text-black
             [&_ul]:list-disc [&_ul]:pl-5
             [&_li]:list-item [&_li]:ml-4'
                        dangerouslySetInnerHTML={{ __html: htmlContent }}
                    />
                </div>
            )}
            {!isUser && isLoading && (
                <Loading />
            )}
            {isUser && (
                <motion.p
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`bg-[#eeeeee] py-3 px-4 text-sm max-w-[300px] md:max-w-[420px] rounded-2xl flex flex-wrap gap-x-1`}>
                    {image ? (
                        <div className="flex flex-col gap-3">
                            <img
                                src={URL.createObjectURL(image)}
                                alt="preview"
                                className="max-h-56  rounded-xl object-cover"
                            />
                            {text}
                        </div>
                    ) : (
                        <>
                            {text}
                        </>
                    )}
                </motion.p>
            )}
        </Fragment>
    )
};

export default ChatBubble;
