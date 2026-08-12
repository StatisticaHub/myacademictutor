type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  copy?: string;
  description?: string;
  center?: boolean;
};

export default function SectionHeading({
  eyebrow,
  title,
  copy,
  description,
  center = false,
}: SectionHeadingProps) {
  const supportingText = description ?? copy;

  return (
    <div className={`section-heading ${center ? "center" : ""}`}>
      {eyebrow && (
        <span className="eyebrow">
          {eyebrow}
        </span>
      )}

      <h2>{title}</h2>

      {supportingText && (
        <p>
          {supportingText}
        </p>
      )}
    </div>
  );
}