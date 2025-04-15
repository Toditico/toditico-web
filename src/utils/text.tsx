export const renderTextWithLinks = (
  description: string,
  generalClasses: string,
) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;

  const descriptionWithLinks = description.replace(urlRegex, (url) => {
    return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="underline wrap-anywhere" onclick="event.stopPropagation();" style="color: #3b82f6; overflow-wrap: anywhere;">${url}</a>`;
  });

  return (
    <p
      className={generalClasses}
      dangerouslySetInnerHTML={{ __html: descriptionWithLinks }}
    />
  );
};
