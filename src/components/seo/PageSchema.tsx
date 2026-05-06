type PageSchemaProps = {
    schema: Record<string, unknown> | Record<string, unknown>[];
};

export default function PageSchema({ schema }: PageSchemaProps) {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
