import React, { Component, PropTypes } from 'react'
import { StyleSheet, View, ToastAndroid } from 'react-native'
import { connect } from 'react-redux'
import { CreateCategoryForm, LoadingModal, Header, BackIcon } from '../components'
import { createMainCategory } from '../reducers/categories'

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'white',
  },
})

class CreateMainCategory extends Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired,
    mainCategoryName: PropTypes.string,
    isCreating: PropTypes.bool.isRequired,
    created: PropTypes.bool.isRequired,
    createMainCategory: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.submit = this.submit.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.created) {
      nextProps.navigator.pop()
      ToastAndroid.show(`成功一级类别: ${nextProps.mainCategoryName}`, ToastAndroid.LONG)
    }
  }

  submit(values) {
    this.props.createMainCategory(values)
  }


  render() {
    const { isCreating } = this.props
    return (
      <View style={styles.root}>
        <Header
          title="创建一级类别"
          leftItem={{
            icon: BackIcon,
            title: '返回',
            layout: 'icon',
            onPress: () => this.props.navigator.pop(),
          }}
        />
        <CreateCategoryForm onSubmit={this.submit} />
        <LoadingModal
          visible={isCreating}
          text="创建一级类别中..."
        />
      </View>
    )
  }
}

function mapStateToProps(state) {
  const {
    entities: { mainCategories },
    categories: {
      createMain: { isCreating, id },
    },
  } = state
  const mainCategoryName = (id && mainCategories[id]) ? mainCategories[id].name : ''
  return {
    mainCategoryName,
    isCreating,
    created: !!id,
  }
}

export default connect(mapStateToProps, { createMainCategory })(CreateMainCategory)
