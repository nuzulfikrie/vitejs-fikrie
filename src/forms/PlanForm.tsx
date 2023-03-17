import React from "react";

const PlanForm = () => {
  return (
<div>
<>
  {/* Hello world */}
  <div className="panel panel-system" wfd-id={9}>
    <div className="panel-heading fill" wfd-id={78}>
      <span className="panel-title" wfd-id={79}>
        Add Plan
      </span>
    </div>
    <form
      method="post"
      acceptCharset="utf-8"
      id="createPlan"
      role="form"
      action="/adminsubscription/subscriptions/plans/add"
      className="fv-plugins-bootstrap3 fv-plugins-framework"
      noValidate="novalidate"
      wfd-id={10}
    >
      <div style={{ display: "none" }} wfd-id={77}>
        <input
          type="hidden"
          name="_method"
          className="form-control"
          defaultValue="POST"
          wfd-id={184}
        />
      </div>{" "}
      <div className="panel-body" wfd-id={11}>
        <div className="col-md-8" wfd-id={72}>
          <div
            className="form-group select has-feedback fv-plugins-icon-container"
            wfd-id={73}
          >
            <label className="control-label" htmlFor="package-id" wfd-id={76}>
              Package
            </label>
            <select
              name="package_id"
              className="form-control"
              id="package-id"
              wfd-id={75}
            >
              <option value={3}>Eaglenavigator Subscription Plan</option>
            </select>
            <i
              data-field="package_id"
              className="fv-plugins-icon form-control-feedback"
            />
            <div className="fv-plugins-message-container" wfd-id={74} />
          </div>{" "}
        </div>
        <div className="col-md-8" wfd-id={67}>
          <div
            className="form-group select has-feedback fv-plugins-icon-container"
            wfd-id={68}
          >
            <label
              className="control-label"
              htmlFor="account-user-group-type-id"
              wfd-id={71}
            >
              Account User Group Type
            </label>
            <select
              name="account_user_group_type_id"
              className="form-control"
              id="account-user-group-type-id"
              wfd-id={70}
            >
              <option value={2}>Single User</option>
              <option value={3}>Group User</option>
            </select>
            <i
              data-field="account_user_group_type_id"
              className="fv-plugins-icon form-control-feedback"
            />
            <div className="fv-plugins-message-container" wfd-id={69} />
          </div>{" "}
        </div>
        <div className="col-md-8" wfd-id={63}>
          <div
            className="form-group text has-feedback fv-plugins-icon-container"
            wfd-id={64}
          >
            <label className="control-label" htmlFor="plan-name" wfd-id={66}>
              Plan Name
            </label>
            <input
              type="text"
              name="plan_name"
              className="form-control"
              id="plan-name"
              wfd-id={183}
            />
            <i
              data-field="plan_name"
              className="fv-plugins-icon form-control-feedback"
            />
            <div className="fv-plugins-message-container" wfd-id={65} />
          </div>{" "}
        </div>
        <div className="col-md-8" wfd-id={59}>
          <div
            className="form-group number has-feedback fv-plugins-icon-container"
            wfd-id={60}
          >
            <label className="control-label" htmlFor="plan-ranking" wfd-id={62}>
              Plan Ranking
            </label>
            <input
              type="number"
              name="plan_ranking"
              className="form-control"
              id="plan-ranking"
              wfd-id={182}
            />
            <i
              data-field="plan_ranking"
              className="fv-plugins-icon form-control-feedback"
            />
            <div className="fv-plugins-message-container" wfd-id={61} />
          </div>{" "}
        </div>
        <div className="col-md-8" wfd-id={54}>
          <div
            className="form-group select has-feedback fv-plugins-icon-container"
            wfd-id={55}
          >
            <label className="control-label" htmlFor="countryName" wfd-id={58}>
              Country
            </label>
            <select
              name="countryName"
              className="form-control"
              id="countryName"
              wfd-id={57}
            >
              <option value="">(choose one)</option>
              <option value="Afghanistan">Afghanistan</option>
              <option value="Albania">Albania</option>
              <option value="Algeria">Algeria</option>
              <option value="Andorra">Andorra</option>
              <option value="Angola">Angola</option>
              <option value="Antigua & Deps">Antigua &amp; Deps</option>
              <option value="Argentina">Argentina</option>
              <option value="Armenia">Armenia</option>
              <option value="Aruba">Aruba</option>
              <option value="Australia">Australia</option>
              <option value="Austria">Austria</option>
              <option value="Azerbaijan">Azerbaijan</option>
              <option value="Bahamas">Bahamas</option>
              <option value="Bahrain">Bahrain</option>
              <option value="Bangladesh">Bangladesh</option>
              <option value="Barbados">Barbados</option>
              <option value="Belarus">Belarus</option>
              <option value="Belgium">Belgium</option>
              <option value="Belize">Belize</option>
              <option value="Benin">Benin</option>
              <option value="Bhutan">Bhutan</option>
              <option value="Bolivia">Bolivia</option>
              <option value="Bosnia Herzegovina">Bosnia Herzegovina</option>
              <option value="Botswana">Botswana</option>
              <option value="Brazil">Brazil</option>
              <option value="Brunei">Brunei</option>
              <option value="Bulgaria">Bulgaria</option>
              <option value="Burkina">Burkina</option>
              <option value="Burundi">Burundi</option>
              <option value="Cambodia">Cambodia</option>
              <option value="Cameroon">Cameroon</option>
              <option value="Canada">Canada</option>
              <option value="Cape Verde">Cape Verde</option>
              <option value="Central African Rep">Central African Rep</option>
              <option value="Chad">Chad</option>
              <option value="Chile">Chile</option>
              <option value="China">China</option>
              <option value="Colombia">Colombia</option>
              <option value="Comoros">Comoros</option>
              <option value="Congo">Congo</option>
              <option value="Congo (Democratic Rep)">
                Congo (Democratic Rep)
              </option>
              <option value="Costa Rica">Costa Rica</option>
              <option value="Croatia">Croatia</option>
              <option value="Cuba">Cuba</option>
              <option value="Curaçao">Curaçao</option>
              <option value="Cyprus">Cyprus</option>
              <option value="Czech Republic">Czech Republic</option>
              <option value="Denmark">Denmark</option>
              <option value="Djibouti">Djibouti</option>
              <option value="Dominica">Dominica</option>
              <option value="Dominican Republic">Dominican Republic</option>
              <option value="East Timor">East Timor</option>
              <option value="Ecuador">Ecuador</option>
              <option value="Egypt">Egypt</option>
              <option value="El Salvador">El Salvador</option>
              <option value="Equatorial Guinea">Equatorial Guinea</option>
              <option value="Eritrea">Eritrea</option>
              <option value="Estonia">Estonia</option>
              <option value="Eswatini">Eswatini</option>
              <option value="Ethiopia">Ethiopia</option>
              <option value="Fiji">Fiji</option>
              <option value="Finland">Finland</option>
              <option value="France">France</option>
              <option value="Gabon">Gabon</option>
              <option value="Gambia">Gambia</option>
              <option value="Georgia">Georgia</option>
              <option value="Germany">Germany</option>
              <option value="Ghana">Ghana</option>
              <option value="Greece">Greece</option>
              <option value="Grenada">Grenada</option>
              <option value="Guatemala">Guatemala</option>
              <option value="Guinea">Guinea</option>
              <option value="Guinea-Bissau">Guinea-Bissau</option>
              <option value="Guyana">Guyana</option>
              <option value="Haiti">Haiti</option>
              <option value="Honduras">Honduras</option>
              <option value="Hungary">Hungary</option>
              <option value="Iceland">Iceland</option>
              <option value="India">India</option>
              <option value="Indonesia">Indonesia</option>
              <option value="Iran">Iran</option>
              <option value="Iraq">Iraq</option>
              <option value="Ireland (Republic)">Ireland(Republic)</option>
              <option value="Israel">Israel</option>
              <option value="Italy">Italy</option>
              <option value="Ivory Coast">Ivory Coast</option>
              <option value="Jamaica">Jamaica</option>
              <option value="Japan">Japan</option>
              <option value="Jordan">Jordan</option>
              <option value="Kazakhstan">Kazakhstan</option>
              <option value="Kenya">Kenya</option>
              <option value="Kiribati">Kiribati</option>
              <option value="Kosovo">Kosovo</option>
              <option value="Kuwait">Kuwait</option>
              <option value="Kyrgyzstan">Kyrgyzstan</option>
              <option value="Laos">Laos</option>
              <option value="Latvia">Latvia</option>
              <option value="Lebanon">Lebanon</option>
              <option value="Lesotho">Lesotho</option>
              <option value="Liberia">Liberia</option>
              <option value="Libya">Libya</option>
              <option value="Liechtenstein">Liechtenstein</option>
              <option value="Lithuania">Lithuania</option>
              <option value="Luxembourg">Luxembourg</option>
              <option value="Macedonia">Macedonia</option>
              <option value="Madagascar">Madagascar</option>
              <option value="Malawi">Malawi</option>
              <option value="Malaysia">Malaysia</option>
              <option value="Maldives">Maldives</option>
              <option value="Mali">Mali</option>
              <option value="Malta">Malta</option>
              <option value={0}>Marshall Islands</option>
              <option value="Mauritania">Mauritania</option>
              <option value="Mauritius">Mauritius</option>
              <option value="Mexico">Mexico</option>
              <option value="Micronesia">Micronesia</option>
              <option value="Moldova">Moldova</option>
              <option value="Monaco">Monaco</option>
              <option value="Mongolia">Mongolia</option>
              <option value="Montenegro">Montenegro</option>
              <option value="Morocco">Morocco</option>
              <option value="Mozambique">Mozambique</option>
              <option value="Myanmar">Myanmar</option>
              <option value="Namibia">Namibia</option>
              <option value="Nauru">Nauru</option>
              <option value="Nepal">Nepal</option>
              <option value="Netherlands">Netherlands</option>
              <option value="New Zealand">New Zealand</option>
              <option value="Nicaragua">Nicaragua</option>
              <option value="Niger">Niger</option>
              <option value="Nigeria">Nigeria</option>
              <option value="Norway">Norway</option>
              <option value="North Korea">North Korea</option>
              <option value="Oman">Oman</option>
              <option value="Pakistan">Pakistan</option>
              <option value="Palau">Palau</option>
              <option value="Palestine">Palestine</option>
              <option value="Panama">Panama</option>
              <option value="Papua New Guinea">Papua New Guinea</option>
              <option value="Paraguay">Paraguay</option>
              <option value="Peru">Peru</option>
              <option value="Philippines">Philippines</option>
              <option value="Poland">Poland</option>
              <option value="Portugal">Portugal</option>
              <option value="Qatar">Qatar</option>
              <option value="Romania">Romania</option>
              <option value="Russian Federation">Russian Federation</option>
              <option value="Rwanda">Rwanda</option>
              <option value="St Kitts & Nevis">St Kitts &amp; Nevis</option>
              <option value="St Lucia">St Lucia</option>
              <option value="Saint Vincent & the Grenadines">
                Saint Vincent &amp; the Grenadines
              </option>
              <option value="Samoa">Samoa</option>
              <option value="San Marino">San Marino</option>
              <option value="Sao Tome & Principe">
                Sao Tome &amp; Principe
              </option>
              <option value="Saudi Arabia">Saudi Arabia</option>
              <option value="Senegal">Senegal</option>
              <option value="Serbia">Serbia</option>
              <option value="Seychelles">Seychelles</option>
              <option value="Sierra Leone">Sierra Leone</option>
              <option value="Singapore">Singapore</option>
              <option value="Slovakia">Slovakia</option>
              <option value="Slovenia">Slovenia</option>
              <option value="Solomon Islands">Solomon Islands</option>
              <option value="Somalia">Somalia</option>
              <option value="South Africa">South Africa</option>
              <option value="South Korea">South Korea</option>
              <option value="South Sudan">South Sudan</option>
              <option value="Spain">Spain</option>
              <option value="Sri Lanka">Sri Lanka</option>
              <option value="Sudan">Sudan</option>
              <option value="Suriname">Suriname</option>
              <option value="Sweden">Sweden</option>
              <option value="Switzerland">Switzerland</option>
              <option value="Syria">Syria</option>
              <option value="Taiwan">Taiwan</option>
              <option value="Tajikistan">Tajikistan</option>
              <option value="Tanzania">Tanzania</option>
              <option value="Thailand">Thailand</option>
              <option value="Togo">Togo</option>
              <option value="Tonga">Tonga</option>
              <option value="Trinidad & Tobago">Trinidad &amp; Tobago</option>
              <option value="Tunisia">Tunisia</option>
              <option value="Turkey">Turkey</option>
              <option value="Turkmenistan">Turkmenistan</option>
              <option value="Tuvalu">Tuvalu</option>
              <option value="Uganda">Uganda</option>
              <option value="Ukraine">Ukraine</option>
              <option value="United Arab Emirates">United Arab Emirates</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="United States">United States</option>
              <option value="Uruguay">Uruguay</option>
              <option value="Uzbekistan">Uzbekistan</option>
              <option value="Vanuatu">Vanuatu</option>
              <option value="Vatican City">Vatican City</option>
              <option value="Venezuela">Venezuela</option>
              <option value="Vietnam">Vietnam</option>
              <option value="Yemen">Yemen</option>
              <option value="Zambia">Zambia</option>
              <option value="Zimbabwe">Zimbabwe</option>
            </select>
            <i
              data-field="countryName"
              className="fv-plugins-icon form-control-feedback"
            />
            <div className="fv-plugins-message-container" wfd-id={56} />
          </div>{" "}
        </div>
        <div className="col-md-8" wfd-id={49}>
          <div
            className="form-group select has-feedback fv-plugins-icon-container"
            wfd-id={50}
          >
            <label className="control-label" htmlFor="currency" wfd-id={53}>
              Currency
            </label>
            <select
              name="currency"
              className="form-control"
              id="currency"
              wfd-id={52}
            >
              <option value="">(choose one)</option>
              <option value="usd">United States Dollar</option>
              <option value="eur">Euro</option>
              <option value="jpy">Japanese Yen</option>
              <option value="myr">Malaysian Ringgit</option>
              <option value="sgd">Singapore Dollar</option>
              <option value="idr">Indonesian Rupiah</option>
              <option value="sar">Saudi Riyal</option>
              <option value="aed">UAE dirham</option>
              <option value="afn">Afghan afghani</option>
              <option value="all">Albanian lek</option>
              <option value="amd">Armenian dram</option>
              <option value="ang">Netherlands Antillian Guilder</option>
              <option value="aoa">Angolan Kwanza</option>
              <option value="ars">Argentine Peso</option>
              <option value="aud">Australian Dollar</option>
              <option value="awg">Aruban Florin</option>
              <option value="azn">Azerbaijani Manat</option>
              <option value="bam">Bosnia-Herzegovina Convertible Mark</option>
              <option value="bbd">Barbados Dollar</option>
              <option value="bdt">Bangladeshi Taka</option>
              <option value="bgn">Bulgarian Lev</option>
              <option value="bif">Burundian Franc</option>
              <option value="bmd">Bermudan Dollar</option>
              <option value="bnd">Brunei Dollar</option>
              <option value="bob">Bolivian Boliviano</option>
              <option value="brl">Brazilian Real</option>
              <option value="bsd">Bahamian Dollar</option>
              <option value="bwp">Botswanan Pula</option>
              <option value="byn">Belarusian Ruble</option>
              <option value="bzd">Belize Dollar</option>
              <option value="cad">Canadian Dollar</option>
              <option value="cdf">Congolese Franc</option>
              <option value="chf">Swiss Franc</option>
              <option value="clp">Chilean Peso</option>
              <option value="cny">Chinese Yuan</option>
              <option value="cop">Colombian Peso</option>
              <option value="crc">Costa Rican Colón</option>
              <option value="cve">Cape Verdean Escudo</option>
              <option value="czk">Czech Koruna</option>
              <option value="djf">Djiboutian Franc</option>
              <option value="dkk">Danish Krone</option>
              <option value="dop">Dominican Peso</option>
              <option value="dzd">Algerian Dinar</option>
              <option value="egp">Egyptian Pound</option>
              <option value="etb">Ethiopian Birr</option>
              <option value="fjd">Fijian Dollar</option>
              <option value="fkp">Falkland Islands pound</option>
              <option value="gbp">Pound Sterling</option>
              <option value="gel">Georgian Lari</option>
              <option value="gip">Gibraltar Pound</option>
              <option value="gmd">Gambian Dalasi</option>
              <option value="gnf">Guinean Franc</option>
              <option value="gtq">Guatemalan Quetzal</option>
              <option value="gyd">Guyanese Dollar</option>
              <option value="hkd">Hong Kong Dollar</option>
              <option value="hnl">Honduran Lempira</option>
              <option value="hrk">Croatian Kuna</option>
              <option value="htg">Haitian Gourde</option>
              <option value="huf">Hungarian Forint</option>
              <option value="ils">Israeli Shekel</option>
              <option value="inr">Indian Rupee</option>
              <option value="isk">Icelandic Króna</option>
              <option value="jmd">Jamaican Dollar</option>
              <option value="kes">Kenyan Shilling</option>
              <option value="kgs">Kyrgystani Som</option>
              <option value="khr">Cambodian Riel</option>
              <option value="kmf">Comorian Franc</option>
              <option value="krw">South Korean Won</option>
              <option value="kyd">Cayman Islands Dollar</option>
              <option value="kzt">Kazakhstani Tenge</option>
              <option value="lak">Laotian Kip</option>
              <option value="lbp">Lebanese Pound</option>
              <option value="lkr">Sri Lankan Rupee</option>
              <option value="lrd">Liberian Dollar</option>
              <option value="lsl">Lesotho Loti</option>
              <option value="mad">Moroccan Dirham</option>
              <option value="mdl">Moldovan Leu</option>
              <option value="mga">Malagasy Ariary</option>
              <option value="mkd">Macedonian Denar</option>
              <option value="mmk">Myanmar Kyat</option>
              <option value="mnt">Mongolian Tögrög</option>
              <option value="mop">Macanese Pataca</option>
              <option value="mro">Mauritanian Ouguiya</option>
              <option value="mur">Mauritian Rupee</option>
              <option value="mvr">Maldivian Rufiyaa</option>
              <option value="mwk">Malawian Kwacha</option>
              <option value="mxn">Mexican Peso</option>
              <option value="mzn">Mozambican Metical</option>
              <option value="nad">Namibian Dollar</option>
              <option value="ngn">Nigerian Naira</option>
              <option value="nio">Nicaraguan Córdoba</option>
              <option value="nok">Norwegian Krone</option>
              <option value="npr">Nepalese Rupee</option>
              <option value="nzd">New Zealand Dollar</option>
              <option value="pab">Panamanian Balboa</option>
              <option value="pen">Peruvian Sol</option>
              <option value="pgk">Papua New Guinean Kina</option>
              <option value="php">Philippine Peso</option>
              <option value="pkr">Pakistani Rupee</option>
              <option value="pln">Poland Zloty</option>
              <option value="pyg">Paraguayan Guarani</option>
              <option value="qar">Qatari Rial</option>
              <option value="ron">Romanian Leu</option>
              <option value="rsd">Serbian Dinar</option>
              <option value="rub">Russian Ruble</option>
              <option value="rwf">Rwandan Franc</option>
              <option value="sbd">Solomon Islands Dollar</option>
              <option value="scr">Seychellois Rupee</option>
              <option value="sek">Swedish Krona</option>
              <option value="shp">Saint Helena Pound</option>
              <option value="sll">Sierra Leonean Leone</option>
              <option value="sos">Somali Shilling</option>
              <option value="srd">Surinamese Dollar</option>
              <option value="std">São Tomé and Príncipe dobra</option>
              <option value="szl">Swazi Lilangeni</option>
              <option value="thb">Thai Baht</option>
              <option value="tjs">Tajikistani Somoni</option>
              <option value="top">Tongan Pa\ʻanga</option>
              <option value="try">Turkish Lira</option>
              <option value="ttd">Trinidad &amp; Tobago Dollar</option>
              <option value="twd">New Taiwan Dollar</option>
              <option value="tzs">Tanzanian Shilling</option>
              <option value="uah">Ukrainian Hryvnia</option>
              <option value="ugx">Ugandan Shilling</option>
              <option value="uyu">Uruguayan Peso</option>
              <option value="uzs">Uzbekistaniz Som</option>
              <option value="vnd">Vietnamese Dong</option>
              <option value="vuv">Vanuatu Vatu</option>
              <option value="wst">Samoan Tālā</option>
              <option value="xaf">Central African CFA Franc</option>
              <option value="xcd">East Caribbean Dollar</option>
              <option value="xof">West African CFA Franc</option>
              <option value="xpf">CFP Franc</option>
              <option value="yer">Yemeni Rial</option>
              <option value="zar">South African Rand</option>
              <option value="zmw">Zambian Kwacha</option>
            </select>
            <i
              data-field="currency"
              className="fv-plugins-icon form-control-feedback"
            />
            <div className="fv-plugins-message-container" wfd-id={51} />
          </div>{" "}
        </div>
        <div className="col-md-8" wfd-id={45}>
          <div
            className="form-group text has-feedback fv-plugins-icon-container"
            wfd-id={46}
          >
            <label className="control-label" htmlFor="product-code" wfd-id={48}>
              Product Code
            </label>
            <input
              type="text"
              name="product_code"
              className="form-control"
              id="product-code"
              wfd-id={181}
            />
            <i
              data-field="product_code"
              className="fv-plugins-icon form-control-feedback"
            />
            <div className="fv-plugins-message-container" wfd-id={47} />
          </div>{" "}
        </div>
        <div className="col-md-8" wfd-id={41}>
          <div
            className="form-group text has-feedback fv-plugins-icon-container"
            wfd-id={42}
          >
            <label
              className="control-label"
              htmlFor="landing-page-url"
              wfd-id={44}
            >
              Landing Page Url
            </label>
            <input
              type="text"
              name="landing_page_url"
              className="form-control"
              id="landing-page-url"
              wfd-id={180}
            />
            <i
              data-field="landing_page_url"
              className="fv-plugins-icon form-control-feedback"
            />
            <div className="fv-plugins-message-container" wfd-id={43} />
          </div>{" "}
        </div>
        <div className="col-md-8" wfd-id={36}>
          <div
            className="form-group select has-feedback fv-plugins-icon-container"
            wfd-id={37}
          >
            <label
              className="control-label"
              htmlFor="intended-user"
              wfd-id={40}
            >
              Intended User
            </label>
            <select
              name="intended_user"
              className="form-control"
              id="intended-user"
              wfd-id={39}
            >
              <option value="">Choose one</option>
              <option value="user">User</option>
              <option value="user_supervisor">User Supervisor</option>
              <option value="supervisor">Supervisor</option>
              <option value="user_group">User Group</option>
            </select>
            <i
              data-field="intended_user"
              className="fv-plugins-icon form-control-feedback"
            />
            <div className="fv-plugins-message-container" wfd-id={38} />
          </div>
        </div>
        <div className="col-md-8" wfd-id={32}>
          <div
            className="form-group number has-feedback fv-plugins-icon-container"
            wfd-id={33}
          >
            <label className="control-label" htmlFor="trial-days" wfd-id={35}>
              Trial Days
            </label>
            <input
              type="number"
              name="trial_days"
              className="form-control"
              id="trial-days"
              defaultValue={30}
              wfd-id={179}
            />
            <i
              data-field="trial_days"
              className="fv-plugins-icon form-control-feedback"
            />
            <div className="fv-plugins-message-container" wfd-id={34} />
          </div>
        </div>
        <div className="col-md-8" wfd-id={27}>
          <div
            className="form-group select has-feedback fv-plugins-icon-container"
            wfd-id={28}
          >
            <label
              className="control-label"
              htmlFor="plan-duration"
              wfd-id={31}
            >
              Plan Duration
            </label>
            <select
              name="plan_duration"
              className="form-control"
              id="plan-duration"
              wfd-id={30}
            >
              <option value="">Choose one</option>
              <option value="day">Daily</option>
              <option value="month">Monthly</option>
              <option value="week">Weekly</option>
              <option value="year">Yearly</option>
            </select>
            <i
              data-field="plan_duration"
              className="fv-plugins-icon form-control-feedback"
            />
            <div className="fv-plugins-message-container" wfd-id={29} />
          </div>{" "}
        </div>
        <div className="col-md-8" wfd-id={23}>
          <div
            className="form-group text has-feedback fv-plugins-icon-container"
            wfd-id={24}
          >
            <label
              className="control-label"
              htmlFor="current-price"
              wfd-id={26}
            >
              Current Price
            </label>
            <input
              type="text"
              name="current_price"
              className="form-control"
              id="current-price"
              wfd-id={178}
            />
            <i
              data-field="current_price"
              className="fv-plugins-icon form-control-feedback"
            />
            <div className="fv-plugins-message-container" wfd-id={25} />
          </div>{" "}
        </div>
        <div className="col-md-8" wfd-id={20}>
          <div className="checkbox " wfd-id={21}>
            <input
              type="hidden"
              name="has_recurring_plan"
              className="form-control"
              defaultValue={0}
              wfd-id={177}
            />
            <label htmlFor="has-recurring-plan" wfd-id={22}>
              <input
                type="checkbox"
                name="has_recurring_plan"
                defaultValue={1}
                defaultChecked="checked"
                id="has-recurring-plan"
                wfd-id={176}
              />
              Has Recurring Plan
            </label>
          </div>{" "}
        </div>
        <div className="col-md-8" wfd-id={17}>
          <div className="checkbox " wfd-id={18}>
            <input
              type="hidden"
              name="active"
              className="form-control"
              defaultValue={0}
              wfd-id={175}
            />
            <label htmlFor="active" wfd-id={19}>
              <input
                type="checkbox"
                name="active"
                defaultValue={1}
                defaultChecked="checked"
                id="active"
                wfd-id={174}
              />
              Active
            </label>
          </div>
        </div>
        <div className="col-md-8" wfd-id={14}>
          <div className="checkbox " wfd-id={15}>
            <input
              type="hidden"
              name="has_variation"
              className="form-control"
              defaultValue={0}
              wfd-id={173}
            />
            <label htmlFor="has-variation" wfd-id={16}>
              <input
                type="checkbox"
                name="has_variation"
                defaultValue={1}
                id="has-variation"
                wfd-id={172}
              />
              Has Variation
            </label>
          </div>
        </div>
        <div className="col-md-8" wfd-id={12}>
          <div className="button-groups" wfd-id={13}>
            <button className="btn btn-dark" type="submit" wfd-id={187}>
              Submit
            </button>{" "}
            <button
              className="btn btn-warning"
              type="button"
              name="resetButton"
              id="resetButton"
              wfd-id={186}
            >
              Reset
            </button>{" "}
          </div>
        </div>
      </div>
      <input type="hidden" wfd-id={171} />
    </form>
  </div>
</>

</div>
  );
};

export default PlanForm;