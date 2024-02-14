// generate CorrespondPath
export async function generateCorrespondPath(timestamp: number) {
    const publicKey = await crypto.subtle.importKey(
        "jwk",
        {
            kty: "RSA",
            n: "y4HdjgJHBlbaBN04VERG4qNBIFHP6a3GozCl75AihQloSWCXC5HDNgyinEnhaQ_4-gaMud_GF50elYXLlCToR9se9Z8z433U3KjM-3Yx7ptKkmQNAMggQwAVKgq3zYAoidNEWuxpkY_mAitTSRLnsJW-NCTa0bqBFF6Wm1MxgfE",
            e: "AQAB",
        },
        { name: "RSA-OAEP", hash: "SHA-256" },
        true,
        ["encrypt"],
    )

    const data = new TextEncoder().encode(`refresh_${timestamp}`);
    const encrypted = new Uint8Array(await crypto.subtle.encrypt({ name: "RSA-OAEP" }, publicKey, data))
    return encrypted.reduce((str, c) => str + c.toString(16).padStart(2, "0"), "")
}

// html parse
export function htmlParse(html: string) {
    console.log(html);
    let parser = new DOMParser()
    let doc = parser.parseFromString(html, 'text/html')
    console.log(doc);
    let element = doc.getElementById('1-name')
    let text = element?.textContent
    console.log(text);
}