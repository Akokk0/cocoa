import { invoke } from "@tauri-apps/api";

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
export function parseCSRFromHTML(html: string) {
    // New domparser
    let parser = new DOMParser()
    // Parse html from string
    let doc = parser.parseFromString(html, 'text/html')
    // Get the element with ID 1-name
    let element = doc.getElementById('1-name')
    // Check if element is null
    if (!element) throw new Error('element is not exist')
    // Return csrf
    return element.textContent!
}

export async function getImgUsingRust(url: string) {
    let attempts = 3
    for (let i = attempts; i > 0; i--) {
        try {
            return await invoke('img_request', {
                url,
                reqType: 'GET',
            })
        } catch (e) {
            if (i === 1) {
                throw new Error('network error')
            }
        }
    }
}