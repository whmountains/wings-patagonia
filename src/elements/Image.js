import React from 'react'

export class ResponsiveImage extends React.PureComponent {
  render() {
    const { src, srcsets } = this.props.info
    console.log(this.props.info)

    return (
      <picture className={this.props.className}>
        {srcsets.map(({ mime, srcset }) => (
          <source
            sizes={this.props.sizes}
            srcSet={srcset}
            type={mime}
            key={mime}
          />
        ))}
        <img src={src} alt={this.props.alt} />
      </picture>
    )
  }
}
