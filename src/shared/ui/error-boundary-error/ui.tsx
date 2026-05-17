import { getErrorMessage } from './lib';

export function ErrorBoundaryError({ error }: Readonly<{ error: unknown }>) {
  return (
    <div>
      <p>An unhandled error occurred:</p>
      <blockquote>
        <code>{getErrorMessage(error)}</code>
      </blockquote>
    </div>
  );
}
