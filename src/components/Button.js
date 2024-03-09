

export default function Button ( {Id, Content, Write}) {

    return (
        <button id={Id} onClick={Write}>{Content}</button>
    )
}