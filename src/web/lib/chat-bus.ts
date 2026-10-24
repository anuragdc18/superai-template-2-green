/** Open the real chatbot from anywhere on the page, optionally sending a first message. */
export const OPEN_CHAT_EVENT = "site:open-chat";

export function openChat(text?: string) {
  window.dispatchEvent(new CustomEvent(OPEN_CHAT_EVENT, { detail: { text } }));
}
