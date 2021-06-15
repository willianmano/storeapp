import React from 'react';
import { Field, reduxForm } from 'redux-form';

const required = value => (value || typeof value === 'number' ? undefined : 'Obrigatório');

class Client extends React.Component {
    renderError({ error, touched }) {
        if (touched && error) {
            return (
                <div className="ui basic red pointing prompt label transition visible">{error}</div>
            );
        }
    }

    renderInput = ({ input, label, meta }) => {
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
        return (
            <div className={className}>
                <label>{label}</label>
                <input {...input} type="text" />
                {this.renderError(meta)}
            </div>
        );
    }

    renderStateInput = ({ input, label, meta }) => {
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
        return(
            <div className={className}>
                <label>{label}</label>
                <select className="ui fluid dropdown" {...input}>
                    <option value="">Estado</option>
                    <option value="AC">Acre</option>
                    <option value="AL">Alagoas</option>
                    <option value="AP">Amapá</option>
                    <option value="AM">Amazonas</option>
                    <option value="BA">Bahia</option>
                    <option value="CE">Ceará</option>
                    <option value="DF">Distrito Federal</option>
                    <option value="ES">Espírito Santo</option>
                    <option value="GO">Goiás</option>
                    <option value="MA">Maranhão</option>
                    <option value="MT">Mato Grosso</option>
                    <option value="MS">Mato Grosso do Sul</option>
                    <option value="MG">Minas Gerais</option>
                    <option value="PA">Pará</option>
                    <option value="PB">Paraíba</option>
                    <option value="PR">Paraná</option>
                    <option value="PE">Pernambuco</option>
                    <option value="PI">Piauí</option>
                    <option value="RJ">Rio de Janeiro</option>
                    <option value="RN">Rio Grande do Norte</option>
                    <option value="RS">Rio Grande do Sul</option>
                    <option value="RO">Rondônia</option>
                    <option value="RR">Roraima</option>
                    <option value="SC">Santa Catarina</option>
                    <option value="SP">São Paulo</option>
                    <option value="SE">Sergipe</option>
                    <option value="TO">Tocantins</option>
                </select>
                {this.renderError(meta)}
            </div>
        );
    }

    renderMonthsInput = ({ input, label, meta }) => {
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
        return(
            <div className={className}>
                <label>{label}</label>
                <select className="ui fluid dropdown" {...input}>
                    <option value="">Mês</option>
                    <option value="01">Janeiro</option>
                    <option value="02">Fevereiro</option>
                    <option value="03">Março</option>
                    <option value="04">Abril</option>
                    <option value="05">Maio</option>
                    <option value="06">Junho</option>
                    <option value="07">Julho</option>
                    <option value="08">Agosto</option>
                    <option value="09">Setembro</option>
                    <option value="10">Outubro</option>
                    <option value="11">Novembro</option>
                    <option value="12">Dezembro</option>
                </select>
                {this.renderError(meta)}
            </div>
        );
    }

    onSubmit = (formProps) => {
        this.props.onSubmit(formProps);
    }

    render() {
        return (
            <div className="ui existing segment">
                <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
                    <h4 className="ui dividing header">Informações para entrega</h4>
                    
                    <Field name="name" component={this.renderInput} label="Nome completo" validate={[required]} />
                    
                    <div className="two fields">
                        <div className="eight wide field">
                            <Field name="email" component={this.renderInput} label="Email" validate={[required]} />
                        </div>
                        <div className="eight wide field">
                            <Field name="cpf" component={this.renderInput} label="CPF" validate={[required]} />
                        </div>
                    </div>

                    <div className="two fields">
                        <div className="eight wide field">
                            <Field name="zipcode" component={this.renderInput} label="CEP" validate={[required]} />
                        </div>
                        <div className="eight wide field">
                            <Field name="neighborhood" component={this.renderInput} label="Bairro" validate={[required]} />
                        </div>
                    </div>
                    <div className="two fields">
                        <div className="twelve wide field">
                            <Field name="address" component={this.renderInput} label="Endereço" validate={[required]} />
                        </div>
                        <div className="four wide field">
                            <Field name="number" component={this.renderInput} label="Número" validate={[required]} />
                        </div>
                    </div>

                    <div className="three fields">
                        <div className="six wide field">
                            <Field name="city" component={this.renderInput} label="Cidade" validate={[required]} />
                        </div>
                        <div className="six wide field">
                            <Field name="state" component={this.renderStateInput} label="Estado" validate={[required]} />
                        </div>
                        <div className="six wide field">
                            <Field name="country" component={this.renderInput} label="País" validate={[required]} />
                        </div>
                    </div>

                    <h4 className="ui dividing header">Cobrança</h4>
                    <div className="four fields">
                        <div className="six wide field">
                            <Field name="card_number" component={this.renderInput} label="Número do cartão" validate={[required]} />
                        </div>
                        <div className="three wide field">
                            <Field name="card_cvc" component={this.renderInput} label="CVC" validate={[required]} />
                        </div>
                        <div className="four wide field">
                            <Field name="card_month" component={this.renderMonthsInput} label="Expira em" validate={[required]} />
                        </div>
                        <div className="three wide field">
                            <Field name="card_year" component={this.renderInput} label="ANO" validate={[required]} />
                        </div>
                    </div>

                    <button className="ui button primary fluid"><i className="money icon"></i> Efetuar pagamento</button>
                </form>
            </div>
        );
    }
};

export default reduxForm({
    form: 'client'
})(Client);