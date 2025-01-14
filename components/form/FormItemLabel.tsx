import * as React from 'react';
import classNames from 'classnames';
import Col, { ColProps } from '../grid/col';
import Row from '../grid/row';
import { FormLabelAlign } from './interface';
import { FormContext, FormContextProps } from './context';
import { RequiredMark } from './Form';
import { useLocaleReceiver } from '../locale-provider/LocaleReceiver';
import defaultLocale from '../locale/default';
import Typography from '../typography';

export interface FormItemLabelProps {
  colon?: boolean;
  htmlFor?: string;
  label?: React.ReactNode;
  labelAlign?: FormLabelAlign;
  labelCol?: ColProps;
  requiredMark?: RequiredMark;
  maxLengthIndicator?: number;
}

const FormItemLabel: React.FC<FormItemLabelProps & { required?: boolean; prefixCls: string }> = ({
  prefixCls,
  label,
  htmlFor,
  labelCol,
  labelAlign,
  colon,
  required,
  requiredMark,
  maxLengthIndicator,
}) => {
  const [formLocale] = useLocaleReceiver('Form');

  if (!label) return null;

  return (
    <FormContext.Consumer key="label">
      {({
        vertical,
        labelAlign: contextLabelAlign,
        labelCol: contextLabelCol,
        colon: contextColon,
      }: FormContextProps) => {
        const mergedLabelCol: ColProps = labelCol || contextLabelCol || {};

        const mergedLabelAlign: FormLabelAlign | undefined = labelAlign || contextLabelAlign;

        const labelClsBasic = `${prefixCls}-item-label`;
        const labelColClassName = classNames(
          labelClsBasic,
          mergedLabelAlign === 'left' && `${labelClsBasic}-left`,
          mergedLabelCol.className,
        );

        let labelChildren = label;
        // Keep label is original where there should have no colon
        const computedColon = colon === true || (contextColon !== false && colon !== false);
        const haveColon = computedColon && !vertical;
        // Remove duplicated user input colon
        if (haveColon && typeof label === 'string' && (label as string).trim() !== '') {
          labelChildren = (label as string).replace(/[:|：]\s*$/, '');
        }

        // Add required mark if optional
        if (requiredMark === 'optional' && !required) {
          labelChildren = (
            <>
              {labelChildren}
              <span className={`${prefixCls}-item-optional`}>
                {formLocale?.optional || defaultLocale.Form?.optional}
              </span>
            </>
          );
        }

        const labelClassName = classNames({
          [`${prefixCls}-item-required`]: required,
          [`${prefixCls}-item-required-mark-optional`]: requiredMark === 'optional',
          [`${prefixCls}-item-no-colon`]: !computedColon,
        });

        return (
          <Col>
            <Row justify="space-between">
              <Col {...mergedLabelCol} className={labelColClassName}>
                <label
                  htmlFor={htmlFor}
                  className={labelClassName}
                  title={typeof label === 'string' ? label : ''}
                >
                  {labelChildren}
                </label>
              </Col>
              {typeof maxLengthIndicator === 'number' && (
                <Col>
                  <Typography.Text
                    type={maxLengthIndicator >= 0 ? 'secondary' : 'danger'}
                    style={{ fontWeight: 'normal' }}
                  >
                    {maxLengthIndicator}
                  </Typography.Text>
                </Col>
              )}
            </Row>
          </Col>
        );
      }}
    </FormContext.Consumer>
  );
};

export default FormItemLabel;
