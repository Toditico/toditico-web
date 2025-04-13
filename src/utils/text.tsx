  export const renderTextWithLinks = (description: string, generalClasses: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;

    const descriptionWithLinks = description.replace(urlRegex, (url) => {
      return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-500 underline" onclick="event.stopPropagation();">${url}</a>`;
    });

    return (
      <p
        className={generalClasses}
        dangerouslySetInnerHTML={{ __html: descriptionWithLinks }}
      />
    );
  };
