import React from 'react'

export class ResponsiveImage extends React.PureComponent {
  render() {
    const { src, srcsets } = this.props.info

    return (
      <picture style={this.props.outerStyles}>
        {srcsets.map(({ mime, srcset }) => (
          <source
            sizes={this.props.sizes}
            srcSet={srcset}
            type={mime}
            key={mime}
          />
        ))}
        <img
          src={src}
          alt={this.props.alt}
          className={this.props.className}
          style={this.props.innerStyles}
        />
      </picture>
    )
  }
}
