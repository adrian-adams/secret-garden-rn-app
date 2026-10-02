import { TextClassContext } from '@/components/ui/text';
import type { LucideIcon, LucideProps } from 'lucide-react-native';
import { styled } from 'nativewind';
import * as React from 'react';
import { cn } from '../../../lib/utils';

type IconProps = LucideProps & {
  as: LucideIcon;
};

const IconImpl = styled(
  ({ as: IconComponent, ...props }: IconProps) => (
    <IconComponent {...props} />
  ),
  {
    className: {
      target: 'style',
      nativeStyleMapping: {
        height: 'size',
        width: 'size',
      },
    },
  }
);

/**
 * A wrapper component for Lucide icons with NativeWind `className` support.
 *
 * @example
 * <Icon
 *   as={ArrowRight}
 *   className="text-red-500"
 *   size={16}
 * />
 */
function Icon({
  as: IconComponent,
  className,
  size = 14,
  ...props
}: IconProps) {
  const textClass = React.useContext(TextClassContext);

  return (
    <IconImpl
      as={IconComponent}
      className={cn('text-foreground', textClass, className)}
      size={size}
      {...props}
    />
  );
}

export { Icon };

