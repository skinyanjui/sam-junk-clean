
interface BlogPostContentProps {
  excerpt: string;
  content?: string;
}

const BlogPostContent = ({ excerpt, content }: BlogPostContentProps) => {
  return (
    <div className="prose prose-lg max-w-none">
      <p className="lead text-xl">{excerpt}</p>
      {content ? (
        <div dangerouslySetInnerHTML={{ __html: content }} />
      ) : (
        <>
          <p>This is where the full blog content would be displayed. In a real application, this would be rendered from the post.content field, potentially using a rich text renderer like react-markdown.</p>
          <h2>Why Proper Junk Removal Matters</h2>
          <p>Improper disposal of waste doesn't just create eyesores; it can have serious environmental consequences. When junk is disposed of incorrectly, harmful chemicals and materials can leach into soil and water sources, causing pollution and endangering wildlife.</p>
          <h2>Benefits of Professional Junk Removal</h2>
          <ul>
            <li>Environmental responsibility through proper sorting and disposal</li>
            <li>Time and energy savings</li>
            <li>Proper handling of potentially hazardous materials</li>
            <li>Recycling and donating items when possible</li>
          </ul>
          <p>By choosing a professional junk removal service like Uncle Sam Junk Removal, you're not just clearing space — you're making an environmentally responsible choice.</p>
        </>
      )}
    </div>
  );
};

export default BlogPostContent;
