import React from "react";
import Image from "next/image";
import BeforeAfterWrapper from "@/components/before-after/wrapper";

// Storyblok Rich Text Types
interface RichTextMark {
  type: string;
  attrs?: Record<string, unknown>;
}

interface RichTextNode {
  type: string;
  attrs?: Record<string, unknown>;
  content?: RichTextNode[];
  text?: string;
  marks?: RichTextMark[];
}

interface RichTextContent {
  type: "doc";
  content: RichTextNode[];
}

interface RenderRichTextOptions {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: RichTextContent | any; // Storyblok richtext type - using any as fallback for flexibility
  className?: string;
}

/**
 * Recursively renders rich text nodes, converting images to Next.js Image components
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function renderNode(
  node: RichTextNode | any,
  key: number = 0
): React.ReactNode {
  if (!node) return null;

  // Handle blok nodes (Storyblok components embedded in rich text)
  if (node.type === "blok") {
    const attrs = node.attrs || {};
    const body = attrs.body;

    // return null;

    if (!body || !Array.isArray(body) || body.length === 0) {
      return null;
    }

    // Handle before_after component
    const firstComponent = body[0];
    if (firstComponent?.component === "before_after") {
      const images = firstComponent.images;

      if (!images || !Array.isArray(images) || images.length < 2) {
        return null;
      }

      const beforeImage = images[0];
      const afterImage = images[1];
      const caption = firstComponent.caption;

      if (!beforeImage?.filename || !afterImage?.filename) {
        return null;
      }

      return (
        <div key={key} className="my-8">
          <BeforeAfterWrapper
            beforeImage={{
              imageUrl: beforeImage.filename,
              alt: beforeImage.alt || "Before image",
            }}
            afterImage={{
              imageUrl: afterImage.filename,
              alt: afterImage.alt || "After image",
            }}
            caption={caption}
          />
        </div>
      );
    }

    // For other component types, return null or handle them here
    return null;
  }

  // Handle image nodes
  if (node.type === "image") {
    const attrs = node.attrs || {};
    const src = attrs.src;
    // Alt text from Storyblok
    const alt = attrs.alt || "";
    // Title/Caption from Storyblok (stored in title field)
    const caption = attrs.title || "";

    if (!src) return null;

    // Extract dimensions from Storyblok URL if available
    // Storyblok URLs often have format: /f/{space_id}/{width}x{height}/{hash}/{filename}
    const urlMatch = src.match(/\/(\d+)x(\d+)\//);
    const width = urlMatch ? parseInt(urlMatch[1]) : 800;
    const height = urlMatch ? parseInt(urlMatch[2]) : 600;

    return (
      <figure key={key} className="my-6">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="w-full h-auto rounded-lg"
          unoptimized={src.includes("a.storyblok.com")}
        />
        {caption && (
          <figcaption className="text-sm text-gray-600 mt-3 text-center">
            {caption}
          </figcaption>
        )}
      </figure>
    );
  }

  // Handle paragraph nodes
  if (node.type === "paragraph") {
    const children = node.content
      ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
        node.content.map((child: any, idx: number) => renderNode(child, idx))
      : null;

    // If paragraph only contains an image, render image directly without paragraph wrapper
    if (node.content?.length === 1 && node.content[0]?.type === "image") {
      return renderNode(node.content[0], key);
    }

    return (
      <p
        key={key}
        className={node.attrs?.textAlign ? `text-${node.attrs.textAlign}` : ""}
      >
        {children}
      </p>
    );
  }

  // Handle heading nodes
  if (node.type === "heading") {
    const level = node.attrs?.level || 2;
    const children = node.content
      ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
        node.content.map((child: any, idx: number) => renderNode(child, idx))
      : null;

    if (level === 1) return <h1 key={key}>{children}</h1>;
    if (level === 2) return <h2 key={key}>{children}</h2>;
    if (level === 3) return <h3 key={key}>{children}</h3>;
    if (level === 4) return <h4 key={key}>{children}</h4>;
    if (level === 5) return <h5 key={key}>{children}</h5>;
    if (level === 6) return <h6 key={key}>{children}</h6>;
    return <h2 key={key}>{children}</h2>;
  }

  // Handle text nodes
  if (node.type === "text") {
    let text: React.ReactNode = node.text || "";

    // Apply marks (bold, italic, etc.) - apply in reverse order
    if (node.marks && Array.isArray(node.marks)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      node.marks.reverse().forEach((mark: any) => {
        if (mark.type === "bold") {
          text = <strong key={key}>{text}</strong>;
        } else if (mark.type === "italic") {
          text = <em key={key}>{text}</em>;
        } else if (mark.type === "code") {
          text = <code key={key}>{text}</code>;
        } else if (mark.type === "link") {
          const href = mark.attrs?.href || "#";
          const target = mark.attrs?.target || "_self";
          text = (
            <a
              key={key}
              href={href}
              target={target}
              rel={target === "_blank" ? "noopener noreferrer" : undefined}
            >
              {text}
            </a>
          );
        }
      });
    }

    return <React.Fragment key={key}>{text}</React.Fragment>;
  }

  // Handle bullet list
  if (node.type === "bullet_list") {
    const children = node.content
      ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
        node.content.map((child: any, idx: number) => renderNode(child, idx))
      : null;
    return <ul key={key}>{children}</ul>;
  }

  // Handle ordered list
  if (node.type === "ordered_list") {
    const children = node.content
      ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
        node.content.map((child: any, idx: number) => renderNode(child, idx))
      : null;
    return <ol key={key}>{children}</ol>;
  }

  // Handle list item
  if (node.type === "list_item") {
    const children = node.content
      ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
        node.content.map((child: any, idx: number) => renderNode(child, idx))
      : null;
    return <li key={key}>{children}</li>;
  }

  // Handle hard break
  if (node.type === "hard_break") {
    return <br key={key} />;
  }

  // Handle blockquote
  if (node.type === "blockquote") {
    const children = node.content
      ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
        node.content.map((child: any, idx: number) => renderNode(child, idx))
      : null;
    return <blockquote key={key}>{children}</blockquote>;
  }

  // Handle code block
  if (node.type === "code_block") {
    const children = node.content
      ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
        node.content.map((child: any, idx: number) => renderNode(child, idx))
      : null;
    return (
      <pre key={key}>
        <code>{children}</code>
      </pre>
    );
  }

  // For any other node types, try to render children if they exist
  if (node.content && Array.isArray(node.content)) {
    return (
      <React.Fragment key={key}>
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {node.content.map((child: any, idx: number) => renderNode(child, idx))}
      </React.Fragment>
    );
  }

  return null;
}

/**
 * Renders Storyblok rich text content with Tailwind Typography prose classes
 * Images are rendered using Next.js Image component
 */
export function renderStoryblokRichText({
  content,
  className = "",
}: RenderRichTextOptions): React.ReactElement | null | undefined {
  if (!content || !content.content || content.content.length === 0) {
    return null;
  }

  // Combine prose classes with any additional classes
  const proseClasses = `prose lg:prose-lg max-w-none ${className}`;

  // Render nodes recursively
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderedContent = content.content.map((node: any, index: number) =>
    renderNode(node, index)
  );

  return <div className={proseClasses}>{renderedContent}</div>;
}
