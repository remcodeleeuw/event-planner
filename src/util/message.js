import uuid from 'uuid/v4';
export function encodeMessage(message) {
  return encodeURIComponent(message + "\n" + generateUrl());
};

export function generateUrl() {
  const websiteUrl = "http:localhost:3000/events"
  return `${websiteUrl}${uuid()}`;
}